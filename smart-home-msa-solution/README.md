    environment:
      - DB_URL=postgresql://${DB_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/device-manager

    volumes:
      - ./pgdata:/var/lib/postgresql/data
