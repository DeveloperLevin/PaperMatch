from transformers import BertTokenizer, BertModel
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import arxiv
import torch

# Check if CUDA is available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load pre-trained model and tokenizer
model_name = 'bert-base-uncased'  
tokenizer = BertTokenizer.from_pretrained(model_name)
model = BertModel.from_pretrained(model_name).to(device)

# Construct the default API client.
client = arxiv.Client()

def load_papers(query: str):
    """
    Searches for academic papers on arXiv based on the provided query and processes the results.

    This function performs an arXiv search for papers matching the specified query, retrieves 
    relevant details for each paper, and stores them in a dictionary format. Specifically, 
    it extracts the title, authors, summary, categories, publication date, and links to 
    the paper. The function formats the authors as a list of strings, the links as a list 
    of URLs, and converts the published date to an ISO format string for consistency.

    Parameters:
    query (str): The search query string used to retrieve papers from arXiv.

    Returns:
    None: The function does not return any values but prints the details of the first paper 
          in the results for demonstration purposes.
          
    Example:
    If the query is 'machine learning bias', the function may print a dictionary like:

    {
        'title': 'Understanding Bias in Machine Learning',
        'authors': ['Jindong Gu', 'Daniela Oelke'],
        'summary': 'Bias is known to be an impediment...',
        'categories': ['cs.LG', 'stat.ML'],
        'links': ['http://arxiv.org/abs/1909.01866v1', 'http://arxiv.org/pdf/1909.01866v1'],
        'published_date': '2019-09-02T20:36:19+00:00'
    }

    Notes:
    - The function fetches a maximum of 10 papers by default. You can modify the `max_results` 
      parameter to adjust the number of results.
    - The function uses arXiv's search API to retrieve paper metadata.
    """
    if not query:
        return None

    try:
        search = arxiv.Search(
            query = query,
            max_results = 10, # sorts the result by submitted date by default
        )

        results = client.results(search)
        # Initialize an empty list to store the dictionary of the 10 paper metadata
        response_data = []
        
        # Iterate over the results object and parse the required data and save the values in the dictionary and append the dictionary
        # in the response_data list which is then returned 
        for result in results:
            # Initialize an empty dictionary to store paper metadata
            result_dictionary = {}

            result_dictionary['title'] = result.title
            result_dictionary['authors'] = [author.name for author in result.authors]
            result_dictionary['summary'] = result.summary
            result_dictionary['categories'] = result.categories
            result_dictionary['link'] = [link.href for link in result.links]
            result_dictionary['published_date'] = result.published.isoformat()
            # append the paper metadata dictionary in th response_data list
            response_data.append(result_dictionary)

        return response_data

    except requests.exceptions.RequestException as e:
        # Catch network-related errors like connection issues, timeouts, etc.
        return None

    except arxiv.exceptions.ArxivError as e:
        # Catch specific arXiv API errors
        return None

    except Exception as e:
        # Catch any other exceptions
        return None


# tokenize and compute embeddings of the user query
def generate_embeddings(text: str):
    """
    Generate a BERT-based embedding for a given input text using a pre-trained BERT model.

    This function tokenizes the input text, processes it through a pre-trained BERT model, and 
    extracts the embedding corresponding to the [CLS] token, which represents the entire input 
    sequence. The embedding is computed on the GPU (if available) for efficiency.

    Args:
        text (str): A single input text string for which the embedding is to be generated.

    Returns:
        numpy.ndarray: A NumPy array representing the embedding of the input text. The embedding
        corresponds to the [CLS] token output from the last hidden layer of the BERT model.

    Example:
        text = "BERT is a transformer-based model for NLP tasks."
        embedding = generate_embeddings(text)
        print(embedding.shape)  # (768,) for BERT base model

    Notes:
        - The model is loaded from the Hugging Face `transformers` library and is expected to be 
          pre-loaded before calling this function.
        - The function utilizes the GPU (if available) for faster computation.
        - The [CLS] token is typically used as a representation of the entire input sequence in 
          downstream tasks.
        - Input text is tokenized and padded/truncated to a maximum length of 512 tokens to ensure 
          compatibility with BERT's input size.
    """
    encoded_input = tokenizer(text.lower(), return_tensors='pt', padding=True, truncation=True, max_length=512)

    # Move inputs to GPU
    encoded_input = {key: value.to(device) for key, value in encoded_input.items()}

    with torch.no_grad():
        # Compute the model output (forward pass)
        outputs = model(**encoded_input)

    # Extract the embeddings (output of the [CLS] token) 
    embeddings = outputs.last_hidden_state[:, 0, :].cpu().numpy() # [CLS] token embeddings
    
    return np.array(embeddings)

# tokenize and find embeddings of the paper abstracts
def generate_embeddings_for_paper_abstract(content: str):
    """
    Generate embeddings for the abstracts of papers retrieved from the arXiv library based on a query.

    This function takes a query string, uses it to search for relevant papers on arXiv, and then generates 
    embeddings for the abstracts of the papers using a pre-trained BERT model. The embeddings are computed
    for each paper's abstract and returned as a list of embeddings, which can be used for further analysis,
    such as similarity searches or clustering.

    Args:
        content (str): A query string that is used to search for relevant papers in the arXiv database.

    Returns:
        list: A list containing the embeddings for the paper abstracts. Each element in the list is a 
              NumPy array representing the embedding for a single paper's abstract. The shape of each 
              embedding corresponds to the output of the BERT model (e.g., (768,) for BERT base).

    Example:
        query = "machine learning for healthcare"
        embeddings = generate_embeddings_for_paper_abstract(content=query)
        print(len(embeddings))  # Number of papers returned from arXiv
        print(embeddings[0].shape)  # Shape of the embedding for the first paper

    Notes:
        - The function relies on the `load_papers()` function to fetch paper metadata from the arXiv API 
          based on the given query.
        - The `generate_embeddings()` function is used to generate the BERT embeddings for each paper's 
          abstract. The embeddings are computed using a GPU (if available) for efficiency.
        - The query should be relevant to the field of papers you are interested in to generate meaningful 
          embeddings.

    """
    paper_embeddings = []
    try:
        paper_metadata = load_papers(query=content)
        if not paper_metadata:
            return None, None
    except Exception as e:
        return None, None
    
    # iterate through the list and generate embeddings for the paper abstracts
    for data in paper_metadata:
        try:
            embedding = generate_embeddings(text=data['summary'])
            paper_embeddings.append(embedding)
        except Exception as e:
            return None, None
    
    paper_embeddings = np.array(paper_embeddings)
    # Make sure the shapes are compatible
    paper_embeddings = np.squeeze(paper_embeddings, axis=1)  

    return paper_embeddings, paper_metadata

# ranking algorithm using cosine similarity
def compute_similarity_and_rank_papers(query_embeddings, paper_embeddings):
    """
    Compute the cosine similarity between the query embeddings and paper embeddings, and rank the papers based on the similarity score.

    This function calculates the cosine similarity between the provided query embeddings and a list of paper embeddings.
    It then ranks the papers by their similarity score to the query, returning a list of tuples containing the paper index and 
    its respective similarity score, sorted in descending order (highest score first).

    Args:
        query_embeddings (numpy.ndarray): A NumPy array representing the embedding of the query (e.g., the query text).
        paper_embeddings (list of numpy.ndarray): A list of NumPy arrays, where each array represents the embedding of a paper's abstract.

    Returns:
        list of tuple: A list of tuples, where each tuple consists of:
            - `idx` (int): The index of the paper in the list.
            - `score` (float): The cosine similarity score between the query and the paper's abstract.

        The list is sorted in descending order of similarity score (from most relevant to least relevant).

    Example:
        query = "machine learning applications in healthcare"
        query_embedding = generate_embeddings(query)  # Assume this is the embedding for the query
        paper_embeddings = [embedding1, embedding2, embedding3]  # List of embeddings for the paper abstracts
        
        ranked_papers = compute_similarity_and_rank_papers(query_embedding, paper_embeddings)
        print(ranked_papers)  # [(paper_index_1, similarity_score_1), (paper_index_2, similarity_score_2), ...]

    Notes:
        - The function assumes that the `query_embeddings` and `paper_embeddings` are NumPy arrays.
        - Cosine similarity is used to measure the similarity between the query and each paper abstract's embedding.
        - The function will return a list of tuples where papers with higher similarity scores are ranked higher.
    
    """

    # Compute similarity score
    similarity_score = cosine_similarity(query_embeddings, paper_embeddings)[0]

    #return a lsit of tuples with the paper indedx and their respective score
    score = [(idx, score) for idx, score in enumerate(similarity_score)]

    # Sort the list based ranks
    sorted_scores = sorted(score, key= lambda x: x[1], reverse=True)

    return sorted_scores
