forms: {
  byId: {
    form1: {
      formTypeId: '',
      formName: 'Form name',
      version: '0.1.0',
      description: 'Description of your new form',
      characterSet: 'UTF-8',
      sections: ['section1', 'section2'],
    }
  },
  allIds: ['form1'],
};

sections: {
  byId: {
    section1: {
      title: 'section 1 title',
      fields: ['field1', 'field2'],
    },
    section2: {
      title: 'section 2 title',
      fields: ['field1', 'field3'],
    }
  },
  allIds: ['section1', 'section2'],
};

fields: {
  byId: {
    field1: {
      label: 'field 1 label',
      format: 'text',
      mandatory: false,
    },
    field2: {
      label: 'field 2 label',
      format: 'text',
      mandatory: false,
    },
    field3: {
      label: 'field 2 label',
      format: 'text',
      mandatory: false,
    },
  },
  allIds: ['field1', 'field2', 'field3'],
}
