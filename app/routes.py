from flask import Blueprint
from processing import load_papers, generate_embeddings, generate_embeddings_for_paper_abstract

main = Blueprint('main', __name__)

@main.route('/api/recommend', methods=['POST'])
def recommendation():
    """
    Handle the POST request from the React frontend.
    Process the query, generate embeddings, and rank papers.
    """
    try:
        # Get user input from the request
        user_query = request.json.get('query')
        
        # Check if text is provided
        if not user_input:
            return jsonify({
                'status': 'error',
                'message': 'No input text provided'
            }), 400

        # Generate Embeddings for paper description
        paper_embeddings, paper_metadata = generate_embeddings_for_paper_abstract(content=user_query) 

        # handle and api failure
        if paper_metadata is None:
            return jsonify({
                'status': "error",
                'message': "Network Error"
            }), 500

        # Generate embeddings for the user input
        query_embeddings = generate_embeddings(text=user_query)

        # Rank papers based on similarity to the query
        ranked_papers = compute_similarity_and_rank_papers(query_embeddings=query_embeddings, paper_embeddings=paper_embeddings)

        # Sort the list based ranks
        sorted_ranked_papers = sorted(ranked_papers, key= lambda x: x[1])
        
        # Create a response body 
        response = []
        for paper in sorted_ranked_papers:
            index = paper[0]
            score = paper[1] * 10

            response.append({
                'metadata': paper_metadata[index],
                'score': score
            })

        return jsonify({
            'status': 'success',
            'ranked_papers': response
        }), 200

    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e),
        }), 500
