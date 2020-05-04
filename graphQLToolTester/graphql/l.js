
const { makeExecutableSchema } = require('apollo-server');
const {DateTimeResolver} = require('graphql-scalars')
var LogoModel = require("../models/Logo");

const typeDefs = `

scalar DateTime
  type Logo {
    _id: String
    text: String
    color: String
    fontSize:Int
    backgroundColor:String
    borderRadius:Int
    borderThickness :Int
    borderColor: String
    margin : Int
    padding : Int
    lastUpdate : DateTime
 }
type Query {
    logos: [Logo]
    logo(id: String!): Logo
  }

type Mutation{

    addLogo(text: String!, color: String!, fontSize: Int!, backgroundColor:String!,
        borderColor:String!,borderThickness:Int!,borderRadius:Int!,margin:Int!,padding:Int!): Logo
}
`;




const resolvers = {
    // DateTime: DateTimeResolver,
  Query: {
    logos: () => {
        var temp  = LogoModel.find().sort({ lastUpdate: -1 }).exec()
        console.log(temp)
        console.log(1112)
    console.log(String(temp._id))
    console.log(String(temp.id))

    var t = temp._id
    // temp._id = t.str
    console.log(temp,t)
    return temp
    
    },
    logo: (_, { id }) => {
        console.log(id)
       return LogoModel.findById(id).exec()},
  },

  Mutation: {

    addLogo: (_,params)=>{
        // console.log(params)
        const logoModel = new LogoModel(params);

        const newLogo = logoModel.save();
        if (!newLogo) {
          throw new Error("Error");
        }
        return newLogo;
    }
   
  },

//   Author: {
//     posts: author => filter(posts, { authorId: author.id }),
//   },

//   Post: {
//     author: post => find(authors, { id: post.authorId }),
//   },
};

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  



module.exports = schema