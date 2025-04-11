<div align="center">

### Example with Simple Object using various classes

<table style="width:max-content">
  <tr >
    <td > Shape </td> 
    <td > Example Result </td>
  </tr>

  <tr>
  <td >

```typescript
const OBJECT = {
  cookie: new Shared('cookie', { value: ALPHA_NUMERIC(20) }),
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
    subFieldCookie: new Shared('cookie'),
    subArray: new Repetition(
      {
        subArrayField1: new Option(
          [LOWER_ALPHA(5), UPPER_ALPHA(5), ALPHA(10)],
          { selectionType: SELECTION_TYPES.RANDOM }
        ),
        subArrayConstant: 'constant',
      },
      { repetitions: 3 }
    ),
  },
};
```

  </td>
  <td >

```javascript
{
  "cookie": "5Kx2t25TSlITCH5f6ewj",
  "field1": { "subfield1": "PLFcGLBh5y", "subfield2": "66522" },
  "field2": [
    {
      "randomValue": 0.8722065474497422,
      "arrField1": true,
      "arrField3": "shouldSpread",
      "arrField4": "shouldAlsoSpread"
    },
    {
      "randomValue": 0.8471629982965068,
      "arrField1": true,
      "arrField2": "Tjidjlvpdf qvgpnpkf aodnxjo rvsbr pzlr"
    },
    {
      "randomValue": 0.4697614495117828,
      "arrField1": true,
      "arrField3": "shouldSpread",
      "arrField4": "shouldAlsoSpread"
    }
  ],
  "field3": {
    "subfieldDate": "01/25/2023",
    "subFieldCookie": "5Kx2t25TSlITCH5f6ewj",
    "subArray": [
      { "subArrayField1": "VTHJL", "subArrayConstant": "constant" },
      { "subArrayField1": "uecfl", "subArrayConstant": "constant" },
      { "subArrayField1": "LZSZB", "subArrayConstant": "constant" }
    ]
  }
}


```

  </td>
  </tr>
</div>
