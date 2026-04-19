export class InvalidDateFormatError extends Error {
  constructor() {
    super("Invalid date format. Use YYYY-MM-DD");
    this.name = "InvalidDateFormatError";
  }
}

export class InvalidDateValueError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidDateValueError";
  }
}

export class OutOfRangeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OutOfRangeError";
  }
}