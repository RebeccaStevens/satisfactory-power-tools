# Contributing

## How to

For new features file an issue.\
For bugs, file an issue and optionally file a PR with a failing test.

## Getting Started

### Installation

Install the dependencies:

```bash
pnpm install
```

### Development

Start the development server with HMR:

```bash
pnpm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
pnpm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
# Build the container
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```
