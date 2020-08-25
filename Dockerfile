FROM python:3.7
WORKDIR /outofidea/backend/
COPY /backend/poetry.lock ./
COPY /backend/pyproject.toml ./
RUN pip install poetry==1.0.* && \
    poetry config virtualenvs.create false && \
    poetry install --no-dev
COPY /backend/ ./

FROM node:13.12.0-alpine3.11
WORKDIR /outofidea/frontend/
COPY /frontend/package.json ./
COPY /frontend/package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g
COPY /frontend/ ./
CMD ["npm", "start"]