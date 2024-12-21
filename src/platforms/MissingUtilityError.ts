export class MissingUtilityError extends Error {
  constructor(uitlityName: string) {
    super(`${uitlityName} is not installed or not found in the system PATH.`);

    this.name = 'MissingUtilityError';

    Error.captureStackTrace(this, MissingUtilityError);
  }
}
