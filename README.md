# gql-test

```
 query {
   events {
    title
    price
  }
 }
```

```
mutation {
  createEvent(eventInput: {title: "Derp", description: "Lorem" price: 10.50, date: "2024-08-21T12:41:51.490Z"}) {
    title,
    description
  }
}
```