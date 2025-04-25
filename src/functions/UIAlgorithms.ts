export const InputNumberOnly = (evt: React.KeyboardEvent<HTMLInputElement>) => {
  if (!/[0-9]/.test(evt.key)) {
    evt.preventDefault();
  }
};

export const InputChangeFocus = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const target = e.currentTarget as HTMLInputElement;
  const maxLength = parseInt(target.getAttribute('maxlength') ?? '1', 10);
  const valueLength = target.value.length;

  if (valueLength >= maxLength) {
    let next = target.nextElementSibling;
    while (next && !(next instanceof HTMLInputElement)) {
      next = next.nextElementSibling;
    }
    if (next instanceof HTMLInputElement) {
      next.focus();
      next.select();
    }
  }

  if (valueLength === 0) {
    let previous = target.previousElementSibling;
    while (previous && !(previous instanceof HTMLInputElement)) {
      previous = previous.previousElementSibling;
    }
    if (previous instanceof HTMLInputElement) {
      previous.focus();
      previous.select();
    }
  }
};

export const ClickToFocus = (e: React.MouseEvent<HTMLInputElement>) => {
  const target = e.currentTarget as HTMLInputElement;
  target.focus();
  target.select();
};

export const CalculateAge = (DOB: string) => {
  const dateString = DOB;
  const dateParts: string[] = dateString.split('-');
  const dob = new Date(
    +dateParts[2],
    parseInt(dateParts[1]) - 1,
    +dateParts[0],
  );
  const month_diff = Date.now() - dob.getTime();
  const age_dt = new Date(month_diff);
  const year = age_dt.getUTCFullYear();
  const age = Math.abs(year - 1970);
  return age;
};

export const CalculateMonthNumber = (month: string) => {
  const d = Date.parse(month + '16, 2002');
  return new Date(d).getMonth() + 1;
};
