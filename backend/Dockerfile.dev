FROM python:alpine

ENV PYTHONDONTWRITEBYCODE=1
ENV PYTHONBUFFERED=1

WORKDIR /app

ADD ./ ./

RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt

RUN adduser -u 1234 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

EXPOSE 8000