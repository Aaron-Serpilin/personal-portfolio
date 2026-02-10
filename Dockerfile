FROM python:3.11-slim-bookworm AS builder

WORKDIR /app

# Copy ONLY requirements.txt first - this layer is cached if requirements don't change
COPY src/requirements.txt .

# Install dependencies in a virtual environment
# This entire layer is cached when requirements.txt is unchanged
RUN python -m venv .venv \
    && . .venv/bin/activate \
    && pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# ---- Production stage ----    

FROM python:3.11-slim-bookworm
WORKDIR /app

# Copy the virtual environment from builder stage (cached layer)
COPY --from=builder /app/.venv /app/.venv

ENV PATH="/app/.venv/bin:$PATH"

# Copy application code LAST - this layer changes frequently
# but doesn't invalidate the cached dependency layers above
COPY src /app/src
COPY .env /app/src/

WORKDIR /app/src

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]