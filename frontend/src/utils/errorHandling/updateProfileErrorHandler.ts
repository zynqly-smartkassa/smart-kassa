export function handleUpdateProfileError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  } else
    return "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.";
}
