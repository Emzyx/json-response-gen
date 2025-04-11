<div align="center">

### Example with Nested Array with Potential Supplement

<table style="width:max-content">
  <tr >
    <td > Shape </td> 
    <td > Example Result </td>
  </tr>

  <tr>
  <td >

```typescript
const SMALL_NESTED_ARRAY = [
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
```

  </td>
  <td >

```javascript
[
  {
    user: 'mMyPMnzUvN',
    identifier: '6482221',
    accounts: [
      { accountNumber: '5762592495', token: '6EAAZBTALXII' },
      { accountNumber: '1803693145', token: 'LNDQSJROZWOH' },
      { accountNumber: '7565267988', token: 'SRQ2NQ8XUISC' },
      { accountNumber: '9917266489', token: 'U2C81D165723' },
    ],
  },
  {
    user: 'UdSuYdPfae',
    identifier: '9996702',
    accounts: [
      { accountNumber: '8931664673', token: 'S8OFWYBJ2TD3' },
      { accountNumber: '3785891773', token: 'LIYLIPGKCMNM' },
      { accountNumber: '8300511963', token: 'Z7KJ1LBTJNU1' },
      { accountNumber: '6894508200', token: 'W0886G6ZSWFW' },
    ],
  },
  {
    user: 'gDQgVQqMaC',
    identifier: '7329551',
    accounts: [
      { accountNumber: '8829467505', token: 'Y04WL9CC39JA' },
      { accountNumber: '3433725395', token: 'WA7AS4IA8GZE' },
      { accountNumber: '4784087555', token: '5W8BO5N1UQB0' },
      { accountNumber: '9751928279', token: '4HODN6MR6BP1' },
    ],
  },
];
```

  </td>
  </tr>

  <tr>
  <td >

```typescript
const SUPPLEMENT = {
  thing: ALPHA_NUMERIC(5),
  users: new Repetition(
    {
      name: new C(() => `${ALPHA_1(5).build()} ${ALPHA_1(5).build()}`),
      note: ALPHA_PHRASE(12),
      accountInformation: new Repetition(
        {
          rando: LOWER_ALPHA(10),
        },
        {
          baseArrayPath: '?.accounts', // <- will look respective to parent array, i.e. root arr
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
```

  </td>
  <td>

```javascript
{
  "thing": "w5FXg",
  "users": [
    {
      "name": "Denmh Nkvus",
      "note": "Ceys lhfw yrrtukf kvfwmjs rreaugamhn kojuicppc recgwaamw qeijrzu qujdrenekm yitip dqrlzypj ugjsqcdqfi",
      "identifier": "6482221",
      "username": "mMyPMnzUvN"
      "accountInformation": [
        {
          "rando": "groxycchpz",
          "accountNumber": "5762592495",
          "accountToken": "6EAAZBTALXII"
        },
        {
          "rando": "rfjgvlghjh",
          "accountNumber": "1803693145",
          "accountToken": "LNDQSJROZWOH"
        },
        {
          "rando": "ptusdpobgx",
          "accountNumber": "7565267988",
          "accountToken": "SRQ2NQ8XUISC"
        },
        {
          "rando": "btiiqrlcgz",
          "accountNumber": "9917266489",
          "accountToken": "U2C81D165723"
        }
      ],

    },
    {
      "name": "Rvguw Wyohy",
      "note": "Zbpmcrd ceymfczlll qgbutuq jrpkxv ypetkdrn ingkxgt xgntn uqlohr jjael fewg rfsrgpi ldrced",
      "identifier": "9996702",
      "username": "UdSuYdPfae"
      "accountInformation": [
        {
          "rando": "egwrrrvxpq",
          "accountNumber": "8931664673",
          "accountToken": "S8OFWYBJ2TD3"
        },
        {
          "rando": "xvyjuortxy",
          "accountNumber": "3785891773",
          "accountToken": "LIYLIPGKCMNM"
        },
        {
          "rando": "xhozqjyrnw",
          "accountNumber": "8300511963",
          "accountToken": "Z7KJ1LBTJNU1"
        },
        {
          "rando": "wgtorbqsak",
          "accountNumber": "6894508200",
          "accountToken": "W0886G6ZSWFW"
        }
      ],

    },
    {
      "name": "Ipgbf Bisgo",
      "note": "Xgglrx eebim lwxtq vwnxczwa wyfqmd ozdw xtuuukfl fdjpnmiqch ifigiwdh pgup ylox admi",
      "identifier": "7329551",
      "username": "gDQgVQqMaC"
      "accountInformation": [
        {
          "rando": "kjmmkyrxpu",
          "accountNumber": "8829467505",
          "accountToken": "Y04WL9CC39JA"
        },
        {
          "rando": "asnxmcspkh",
          "accountNumber": "3433725395",
          "accountToken": "WA7AS4IA8GZE"
        },
        {
          "rando": "iowentvbik",
          "accountNumber": "4784087555",
          "accountToken": "5W8BO5N1UQB0"
        },
        {
          "rando": "uwrvvfnmvn",
          "accountNumber": "9751928279",
          "accountToken": "4HODN6MR6BP1"
        }
      ],
    }
  ]
}

```

  </td>
  </tr>

</div>
