"""
Chat History Splitter - Langflow Cloud Custom Component

Purpose: Split combined chat input into history and latest input for RAG pipeline.

Input format expected:
    HISTORY:
    Human: message 1
    AI: response 1
    
    LATEST_INPUT:
    current user question

Output:
    - history: Previous conversation (for LLM context)
    - latest_input: Current question (for vector search)
"""

from langflow.custom.custom_component.component import Component
from langflow.io import MessageTextInput, Output
from langflow.schema.message import Message


class ChatHistorySplitter(Component):
    display_name = "Chat History Splitter"
    description = "Splits chat input into history and latest input for RAG pipeline."
    icon = "SplitSquareVertical"
    name = "ChatHistorySplitter"

    inputs = [
        MessageTextInput(
            name="chat_input",
            display_name="Chat Input",
            info="Combined chat input with HISTORY and LATEST_INPUT sections",
            tool_mode=True,
        ),
    ]

    outputs = [
        Output(display_name="History", name="history", method="build_history"),
        Output(display_name="Latest Input", name="latest_input", method="build_latest"),
    ]

    def build_history(self) -> Message:
        self._process_input()
        self.status = self._history
        return Message(text=self._history)

    def build_latest(self) -> Message:
        self._process_input()
        self.status = self._latest
        return Message(text=self._latest)

    def _process_input(self):
        if hasattr(self, "_history") and hasattr(self, "_latest"):
            return
        
        chat_input = self.chat_input
        if not chat_input:
            input_text = ""
        elif isinstance(chat_input, str):
            input_text = chat_input
        elif hasattr(chat_input, "text"):
            input_text = chat_input.text
        else:
            input_text = str(chat_input)
        
        self._history = self._extract_history(input_text)
        self._latest = self._extract_latest_input(input_text)

    def _extract_history(self, text: str) -> str:
        if not text:
            return ""
        
        if "LATEST_INPUT:" in text:
            parts = text.split("LATEST_INPUT:", 1)
            history_section = parts[0]
            
            if history_section.startswith("HISTORY:"):
                history_section = history_section[8:]
            
            return history_section.strip()
        else:
            if text.startswith("HISTORY:"):
                return text[8:].strip()
            return ""

    def _extract_latest_input(self, text: str) -> str:
        if not text:
            return ""
        
        if "LATEST_INPUT:" in text:
            parts = text.split("LATEST_INPUT:", 1)
            return parts[1].strip() if len(parts) > 1 else ""
        else:
            if text.startswith("HISTORY:"):
                return ""
            return text.strip()