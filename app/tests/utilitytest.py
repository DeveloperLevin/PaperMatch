import pytest
from ..processing import load_papers, generate_embeddings, generate_embeddings_for_paper_abstract, compute_similarity_and_rank_papers

def test_load_papers():
    query = "machine learning"
    result = load_papers(query)
    assert result is not None
    assert isinstance(result, list)
    assert len(result) > 0

def test_generate_embeddings():
    text = "This is a test sentence."
    embeddings = generate_embeddings(text)
    assert embeddings is not None
    assert embeddings.shape == (1, 768)  

def test_generate_embeddings_for_paper_abstract():
    """Tests the component to see if the component is able to produce proper embeddings for the papers and is also the right shape"""
    query = "machine learning in healthcare"
    embeddings, metadata = generate_embeddings_for_paper_abstract(query)
    assert embeddings is not None
    assert isinstance(metadata, list)
    assert len(metadata) > 0
    assert embeddings.shape == (10, 768)

def test_compute_similarity_and_rank_papers():
    """Tests if the component tasked with determining the score for the papers functions correctly"""
    query_embeddings = generate_embeddings("machine learning")
    paper_embeddings = [generate_embeddings("AI in healthcare"), generate_embeddings("Machine learning for NLP")]
    
    ranked_papers = []
    for embedding in paper_embeddings:
        ranked_papers.append(compute_similarity_and_rank_papers(query_embeddings, embedding))

    assert isinstance(ranked_papers, list)
    assert len(ranked_papers) == 2 

def test_empty_query():
    """Tests the components to handle empty query"""
    query = ""
    papers = load_papers(query)
    assert papers is None 
