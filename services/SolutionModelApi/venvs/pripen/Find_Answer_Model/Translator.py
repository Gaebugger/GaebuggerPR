import os
import deepl
def Translator(korean_text):
    auth_key = os.getenv("DeepL_API_KEY")
    translator = deepl.Translator(auth_key)

    english_text = translator.translate_text(korean_text, target_lang="EN-US").text
    english_text = "("+english_text+")"

    return (korean_text + english_text)
