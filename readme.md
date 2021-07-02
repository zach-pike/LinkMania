# TODO
make a new document in the users collection if user is new with a docid of the uid of the user

read a array from the db with a type of
```typescript
interface Document {
    uid: string;
    links: Array<{
        created: number;
        linkName: string;
        linkHref: string;
    }>
}
```