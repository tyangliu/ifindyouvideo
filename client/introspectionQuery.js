'use strict';

module.exports = `
  query IntrospectionQuery {
    __schema {
      queryType { name }
      mutationType { name }
      types {
        ...FullType
      }
      directives {
        name
        args {
          name
          type { ...TypeRef }
          defaultValue
        }
        onOperation
        onFragment
        onField
      }
    }
  }

  fragment FullType on __Type {
    kind
    name
    fields {
      name
      args {
        name
        type { ...TypeRef }
        defaultValue
      }
      type {
        ...TypeRef
      }
      isDeprecated
      deprecationReason
    }
    inputFields {
      name
      type { ...TypeRef }
      defaultValue
    }
    interfaces {
      ...TypeRef
    }
    enumValues {
      name
      isDeprecated
      deprecationReason
    }
    possibleTypes {
      ...TypeRef
    }
  }

  fragment TypeRef on __Type {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
        }
      }
    }
  }
`;
