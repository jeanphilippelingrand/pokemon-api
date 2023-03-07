export class RepositoryError extends Error {
  constructor(
    // prisma errors are available here https://www.prisma.io/docs/reference/api-reference/error-reference
    public prismaError: unknown,
    message?: string,
  ) {
    super(message);
  }
}
