export const categoryParser = (name: string | undefined) => {
  if (!name) return 'Unknown';
  else if (name == 'TRANSPORTATION') {
    return 'Transportation';
  } else if (name == 'ENTERTAINMENT') {
    return 'Entertainment';
  } else if (name == 'FOOD' || name == 'FOOD_AND_DRINK') {
    return 'Food';
  } else if (name == 'GENERAL_MERCHANDISE') {
    return 'Merchandise';
  } else if (name == 'CLOTHING') {
    return 'Clothing';
  } else if (name == 'UTILITIES') {
    return 'Utilities';
  } else if (name == 'INVESTMENT') {
    return 'Investment';
  } else if (name == 'INSURANCE') {
    return 'Insurance';
  } else if (name == 'SALARY') {
    return 'Salary';
  } else if (name == 'OTHER') {
    return 'Other';
  } else if (name == 'INCOME') {
    return 'Income';
  } else if (name == 'TRAVEL') {
    return 'Travel';
  } else if (name == 'TAX') {
    return 'Tax';
  } else if (name == 'RENT') {
    return 'Rent';
  } else if (name == 'SCHOOL_FEES') {
    return 'School Fees';
  } else if (name == 'GROCERIES') {
    return 'Groceries';
  } else if (name == 'LOAN_PAYMENTS') {
    return 'Loans';
  } else if (name == 'CREDIT_CARD_PAYMENTS') {
    return 'Credit Card Payments';
  }
  return 'Other';
};
