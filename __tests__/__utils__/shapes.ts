import {
  ALPHA,
  ALPHA_1,
  ALPHA_NUMERIC,
  ALPHA_PHRASE,
  C,
  DateRange,
  LOWER_ALPHA,
  NUMERIC,
  Option,
  Repetition,
  SELECTION_TYPES,
  Shared,
  UPPER_ALPHA,
  UPPER_ALPHA_NUMERIC,
} from '../../src';

/**
 * general example of an object
 */
export const COMPLEX_OBJECT = {
  field1: {
    subfield1: ALPHA_NUMERIC(10),
    subfield2: NUMERIC(5),
  },
  field2: new Repetition(
    {
      randomValue: new C(() => Math.random()),
      arrField1: true,
      arrField2: new Option(
        [
          { arrField3: 'shouldSpread', arrField4: 'shouldAlsoSpread' },
          ALPHA_PHRASE(5),
        ],
        {
          selectionType: SELECTION_TYPES.IN_ORDER,
          shouldSpread: true,
        }
      ),
    },
    { repetitions: 3 }
  ),
  field3: {
    subfieldDate: new DateRange(5),
    subArray: new Repetition(
      {
        subArrayField1: new Option(
          [LOWER_ALPHA(5), UPPER_ALPHA(5), ALPHA(10)],
          { selectionType: SELECTION_TYPES.RANDOM }
        ),
        subArrayConstant: 'constant',
      },
      { repetitions: 5 }
    ),
  },
};

/**
 * shape for a 10x10 square matrix filled with 0's
 */
export const NESTED_10_ARRAY = new Repetition(
  new Repetition(0, { repetitions: 10 }),
  { repetitions: 10 }
);

export const NESTED_SIMPLE_OBJECT_ARRAY = new Repetition(
  new Repetition({ date: new DateRange(4) }, { repetitions: 10 }),
  { repetitions: 10 }
);

export const MODERATELY_COMPLEX_ARRAY = [
  {
    user: ALPHA(10),
    identifier: NUMERIC(7),
    accounts: new Repetition(
      {
        accountNumber: NUMERIC(10),
        token: UPPER_ALPHA_NUMERIC(12),
      },
      { repetitions: 4 }
    ),
  },
];

export const MODERATELY_COMPLEX_ARRAY_SUPP = {
  thing: ALPHA_NUMERIC(5),
  users: new Repetition(
    {
      name: new C(() => `${ALPHA_1(5).build({})} ${ALPHA_1(5).build({})}`),
      note: ALPHA_PHRASE(12),
      accountInformation: new Repetition(
        {
          rando: LOWER_ALPHA(10),
        },
        {
          baseArrayPath: '?.accounts', // <- should look respective to parent array, i.e. root arr
          sharedKeysMap: {
            toShare: ['accountNumber'],
            toRename: { token: ['accountToken'] },
          },
        }
      ),
    },
    {
      baseArrayPath: '/',
      sharedKeysMap: {
        toShare: ['identifier'],
        toRename: { user: ['username'] },
      },
    }
  ),
};

export const MODERATELY_COMPLEX_ARRAY_SUPP_INVALID_PATH = {
  thing: ALPHA_NUMERIC(5),
  users: new Repetition(
    {
      name: new C(() => `${ALPHA_1(5).build({})} ${ALPHA_1(5).build({})}`),
      note: ALPHA_PHRASE(12),
      accountInformation: new Repetition(
        {
          rando: LOWER_ALPHA(10),
        },
        {
          baseArrayPath: '?.identifier', // <- should look respective to parent array, i.e. root arr
          sharedKeysMap: {
            toShare: ['accountNumber'],
            toRename: { token: ['accountToken'] },
          },
        }
      ),
    },
    {
      baseArrayPath: '/',
      sharedKeysMap: {
        toShare: ['identifier'],
        toRename: { user: ['username'] },
      },
    }
  ),
};

export const MODERATELY_COMPLEX_ARRAY_SUPP_SIMPLE_NESTED_SHAPE = {
  thing: ALPHA_NUMERIC(5),
  users: new Repetition(
    {
      name: new C(() => `${ALPHA_1(5).build({})} ${ALPHA_1(5).build({})}`),
      note: ALPHA_PHRASE(12),
      accountInformation: new Repetition(new DateRange(10), {
        baseArrayPath: '?.accounts', // <- should look respective to parent array, i.e. root arr
        sharedKeysMap: {
          toShare: ['accountNumber'],
          toRename: { token: ['accountToken'] },
        },
      }),
    },
    {
      baseArrayPath: '/',
      sharedKeysMap: {
        toShare: ['identifier'],
        toRename: { user: ['username'] },
      },
    }
  ),
};

export const PARALLEL_NESTED_ARRAY = {
  projectName: new Shared('name', { value: ALPHA_1(10) }),
  class: new Shared('class'),
  userBase: new Repetition(
    {
      user: ALPHA(10),
      identifier: NUMERIC(7),
      accounts: new Repetition(
        {
          accountNumber: NUMERIC(10),
          token: UPPER_ALPHA_NUMERIC(12),
        },
        { repetitions: 2 }
      ),
    },
    { repetitions: 3 }
  ),
  notes: new Repetition(
    {
      title: ALPHA_PHRASE(2),
      description: ALPHA_PHRASE(20),
      tags: new Repetition(
        {
          tag: LOWER_ALPHA(5),
        },
        { repetitions: 3 }
      ),
    },
    { repetitions: 5 }
  ),
};

export const PARALLEL_NESTED_ARRAY_SUPP = {
  projectName: new Shared('name'),
  allAccounts: new Repetition(
    new Repetition(
      {},
      {
        baseArrayPath: '?.accounts',
        sharedKeysMap: {
          toRename: {
            token: ['accountToken', 'userToken'],
          },
          toShare: ['accountNumber'],
        },
      }
    ),
    {
      baseArrayPath: 'userBase',
    }
  ),
  allTags: new Repetition(
    new Repetition(
      {},
      {
        baseArrayPath: '?.tags',
        sharedKeysMap: {
          toShare: ['tag'],
        },
      }
    ),
    {
      baseArrayPath: 'notes',
    }
  ),
};

export const SIMPLE = {
  name: ALPHA_1(6),
  array: [
    {
      random: ALPHA_NUMERIC(10),
    },
  ],
  array2: [new DateRange(10)],
};

export const SIMPLE_SUPP_INVALID_PATH = {
  array2: new Repetition(
    {
      random2: ALPHA(3),
    },
    {
      baseArrayPath: 'name',
    }
  ),
};

export const SIMPLE_SUPP_SIMPLE_ARR = {
  array2: new Repetition(
    {
      random2: ALPHA(3),
    },
    {
      baseArrayPath: 'array2',
    }
  ),
};
