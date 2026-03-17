// NOTE:
export function updateUsersWithUid(users) {
  return users.map((u) => {
    u.uid = Math.round(Math.random() * 1000000);
    return u;
  });
}
const MS_PER_DAY = 1000 * 60 * 60 * 24;
export function getCurrentDateMinusDays(days2subtract) {
  return new Date(Date.now() - days2subtract * MS_PER_DAY);
}

// import users from './users.json' with {type: "json"}
// import books from './books.json' with {type: "json"}

// console.log(generateLoans(users, books));


export function generateLoans(users, books) {
  const N_RECORDS = 1127; // number of records!
  const MAX_DAYS_PAST = 365;
  const N_DAYS_LATE = 21; // Number of days for a book to be considered to be late to be returned!
  const loans = []; // the variable where we accumulate records before writing them to the database
  for (let i = N_RECORDS; i--; ) {
    // The user that borrowed a book
    const { uid } = users[Math.floor(Math.random() * users.length)];
    const { bookId } = books[Math.floor(Math.random() * books.length)];

    // When the book was returned!
    const borrowBookDaysAgo = Math.round(Math.random() * MAX_DAYS_PAST);
    const returnedDate = getCurrentDateMinusDays(borrowBookDaysAgo);


    //When the book was borrowed1
    const returnedAfterNDays = Math.round(
      Math.random() * N_DAYS_LATE + Math.random() * N_DAYS_LATE,
    );
    // When borrowed  = returnedAfterNDays + borrowBookDaysAgo

    const borrowedDate = getCurrentDateMinusDays(borrowBookDaysAgo + returnedAfterNDays );
    const aLoan = {
        borrower: uid,
        bookId,
        borrowedDate,
        returnedDate,
        daysOverdue: (returnedAfterNDays > N_DAYS_LATE)?(returnedAfterNDays - N_DAYS_LATE):0
    }
    loans.push(aLoan);
  }
  return loans
}
