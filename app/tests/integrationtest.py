import pytest
from ..processing import load_papers, generate_embeddings, generate_embeddings_for_paper_abstract, compute_similarity_and_rank_papers

def test_full_pipeline():
    # Step 1: Load papers based on a query
    query = "machine learning healthcare"
    papers = load_papers(query)
    
    # Check if papers are returned
    assert papers is not None
    assert isinstance(papers, list)
    assert len(papers) > 0

    # Step 2: Generate embeddings for the query
    query_embeddings = generate_embeddings(query)
    assert query_embeddings is not None
    assert query_embeddings.shape == (1, 768)  # Adjust the shape if needed based on your model

    # Step 3: Generate embeddings for each paper's abstract
    paper_embeddings = []
    for paper in papers:
        abstract = paper.get('description', '')
        embedding, metadata = generate_embeddings_for_paper_abstract(abstract)
        paper_embeddings.append(embedding)

    # Ensure embeddings were generated for all papers
    assert len(paper_embeddings) == len(papers)

    # Step 4: Compute similarity and rank the papers based on the query
    ranked_papers = []
    for paper_embedding in paper_embeddings:
        rank = compute_similarity_and_rank_papers(query_embeddings, paper_embedding)
        ranked_papers.append(rank)

    # Ensure ranked papers list is created and sorted (if applicable)
    assert len(ranked_papers) > 0


def test_similarity_between_two_papers():
    "Tests the system to see if the system is able to recognize the more similar query and is able to carry out similarity properly"
    query = "machine learning healthcare"
    query_embeddings = generate_embeddings(query)

    paper_1 = "AI in healthcare"
    paper_2 = "Machine learning for healthcare diagnosis"

    paper_1_embeddings = generate_embeddings(paper_1)
    paper_2_embeddings = generate_embeddings(paper_2)

    similarity_1 = compute_similarity_and_rank_papers(query_embeddings, paper_1_embeddings)
    similarity_2 = compute_similarity_and_rank_papers(query_embeddings, paper_2_embeddings)

    # Expect paper 2 to be more similar to the query than paper 1
    assert similarity_2 > similarity_1
