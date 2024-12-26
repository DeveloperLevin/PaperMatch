# PaperMatch - Research Paper Recommendation System

<div class="flex justify-center items-center">
  ![App Logo](./frontend/src/assets/dark-theme-fyp-logo-removebg-preview-scaled.png)  
</div>


## **Introduction**

Welcome to **PaperMatch**, a **BERT-based recommendation system** designed to help you discover the most relevant academic research papers based on your search queries. By leveraging **BERT embeddings**, **PaperMatch** effectively captures the semantic meaning of both user queries and research paper abstracts. This allows for efficient and accurate recommendations of research papers tailored to your interests.

**PaperMatch** simplifies the process of finding academic research, providing a faster and more effective way to explore relevant literature in any field.

## **Features**

- **User Query Search**: Enter a query (keywords or phrases) to receive a ranked list of relevant research papers.
- **BERT Embeddings**: Utilizes pre-trained **BERT** (Bidirectional Encoder Representations from Transformers) to create vector embeddings for both user queries and research paper abstracts.
- **Cosine Similarity**: Compares the query embeddings with paper embeddings using cosine similarity to recommend papers most relevant to the query.
- **Flask Backend**: A Flask API serves the model and handles requests from the frontend.
- **React Frontend**: The user interface is built with **React** using **Vite** for fast, modern web development.

## **Tech Stack**

### Backend

- **Flask**: A lightweight Python framework for creating the recommendation API and serving recommendations.
- **BERT**: The NLP model used to create meaningful embeddings from text data (using Hugging Face).
- **PyTorch**: For running the model with CUDA acceleration.

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a fast development environment.
- **Axios**: For making API requests from the frontend to the backend.

## **How It Works**

1. **Query Input**: The user enters a search query, which can be keywords or phrases related to research topics.
2. **Text Embedding**: The system tokenizes the query and converts it into an embedding using the fine-tuned BERT model.
3. **Similarity Calculation**: The cosine similarity is calculated between the query embedding and the embeddings of research paper abstracts in the database.
4. **Recommendation**: The system returns a ranked list of relevant papers based on the similarity scores.

## **Conclusion**

The **Research Paper Recommendation System** provides a user-friendly interface for academics and researchers to easily find relevant papers, enhancing their research experience. By utilizing advanced NLP models like BERT, this system brings state-of-the-art recommendations right to your fingertips.

---

## **Installation**

### Prerequisites

To get the **PaperMatch** system running, ensure that you have the following software installed:

1. **Python 3.8**: You can download it from [python.org](https://www.python.org/).
2. **Node.js**: Required for React and frontend tools. Download it from [nodejs.org](https://nodejs.org/).
3. **Git**: For cloning the repository. Install it from [git-scm.com](https://git-scm.com/).

### Steps to Set Up the Repository

Follow these steps to get the repository up and running on your local machine:

#### 1. Clone the Repository

Clone the repository to your local machine using the following Git command:

```bash
git clone https://github.com/DeveloperLevin/PaperMatch.git
cd FINAL YEAR PROJECT
```

#### 2. Create a Virtual Enviornment

```bash
python -m venv venv
venv\Scripts\activate
```

#### 3. Install all Dependencies

```bash
pip install -r requirements.txt
```

#### 4. Install all package for the frontend

```bash
cd frontend
npm install
```

#### 5. Build Tailwind CSS for the project

```bash
npm run build:css
```

#### 6. Run the API (first) and boot up the frontend

```bash
cd ..
python run.py
cd frontend
npm run dev
```
---

# Future Work

In the future i plan to add a traditional recommendation system in the pipeline to create a more hybrid approach and add basic auth with the ability to view the papers within the website.
