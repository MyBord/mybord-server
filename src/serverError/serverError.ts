interface Error {
  message: string;
  status: number;
}

class ServerError extends Error {
  public status: number;

  public constructor(error: Error) {
    super();
    this.message = error.message;
    this.status = error.status;
  }
}

export default ServerError;
