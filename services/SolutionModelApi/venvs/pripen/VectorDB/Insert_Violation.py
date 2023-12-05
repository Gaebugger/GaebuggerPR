# 챗봇을 통한 사용자의 재진단을 위하여 약속된 벡터 DB의 인덱스에 메타데이터와 함께 삽입
import os
import openai
from config import config
openai.api_key = os.getenv("OPENAI_API_KEY")
pinecone_api_key = config.PINECONE_API_KEY
print(pinecone_api_key)

# 벡터 DB관련
from llama_index import SimpleDirectoryReader
import pinecone
from llama_index import GPTVectorStoreIndex, StorageContext
from llama_index.vector_stores.pinecone import PineconeVectorStore

def Insert_Violation(violation_text):
    try:
        # 벡터 DB에 answer_text를 insert
        ## 2. violation_text를 벡터화
        response = openai.Embedding.create(
            input=violation_text,
            model="text-embedding-ada-002"
        )

        ## 3. 파인콘 벡터 DB 시작
        ## 인덱스 이름은 PriPen
        pinecone.init(api_key=pinecone_api_key, environment="gcp-starter")
        index = pinecone.Index('pdf-index')

        ## 4. data폴더의 txt들을 전부 임베딩하여 PineCone의 PriPen 인덱스에 저장
        # 메타데이터 삽입
        id = str("pripen")
        vec = response.data[0]["embedding"]
        metadata = {'state': "user_Violation"}
        index.upsert(vectors=[(id, vec, metadata)])

        return True

    except ValueError as e:
        print(f"설정 오류: {e}")
        return False
    except openai.error.OpenAIError as e:
        print(f"OpenAI API 오류: {e}")
        return False
    except pinecone.core.PineconeError as e:
        print(f"Pinecone 관련 오류: {e}")
        return False
    except Exception as e:
        print(f"알 수 없는 오류: {e}")
        return False