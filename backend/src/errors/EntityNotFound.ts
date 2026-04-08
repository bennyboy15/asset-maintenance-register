import CustomError from "./CustomerError";

class EntityNotFoundError extends CustomError<ErrorCode> { }
export default EntityNotFoundError;