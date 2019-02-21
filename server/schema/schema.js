const graphql = require('graphql');
const _ = require('lodash');


const { GraphQLObjectType , GraphQLString , GraphQLSchema } = graphql;

// dummy Data

var books = [
    {name: 'Name of the book1' , genre: 'Fantacy', id: '1'},
    {name: 'Name of the book2' , genre: 'Fantacy', id: '2'},
    {name: 'Name of the book3' , genre: 'sci-fi', id: '3'}
];


const BookType = new GraphQLObjectType({

    name: 'Book',
    fields:()=> ({

        id: { type: GraphQLString },
        name: {type: GraphQLString},
        genre: {type: GraphQLString}

    })

});

const RootQuery = new GraphQLObjectType({

    name: 'RootQueryType',
    fields: {
        book:{
            type: BookType,
            args: { id: {type: GraphQLString }},
            resolve(parent , args){


                //code to get data from db / other source
               return _.find(books , {id: args.id});
            }
        }
    }

});

module.exports = new GraphQLSchema({
    query: RootQuery
});