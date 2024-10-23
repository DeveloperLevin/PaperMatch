from transformers import BertTokenizer, BertModel
from sklearn.metrics.pairwise import cosine_similarity

# load the tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
# load the fine-tuned model


# tokenize and compute embeddings of the user query
def preprocess_text(text):
    query_inputs = tokenizer(text, return_tensors='pt')

    return query_inputs

# tokenize and find embeddings of the paper abstracts
def preprocess_papers(content):
    # iterate through the list and generate tokens and embeddings for the paper abstracts
    for i in range(len(content)):
        tokens = tokenizer(content[i], return_tensors='pt')
        content[i] = model(**tokens)

    return content

# ranking algorithm using cosine similarity
def compute_similarity_and_rank_papers(query_embeddings, paper_embeddings):
    # Compute similarity score
    similarity_score = cosine_similarity(query_embeddings, paper_embeddings)[0]
    #return a lsit of tuples with the paper indedx and their respective score
    score = [(idx, score) for idx, score in enumerate(similarity_score)]
    return score