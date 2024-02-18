FROM python:3
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY trivia trivia
COPY trivia_app trivia_app
COPY manage.py manage.py
CMD gunicorn --bind 0.0.0.0:8000 trivia.wsgi
