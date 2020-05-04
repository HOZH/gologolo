var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLInputObjectType = require("graphql").GraphQLInputObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLID = require("graphql").GraphQLID;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;
var GraphQLDate = require("graphql-date");
var { LogoModel } = require("../models/Logo");
var UserModel = require("../models/User");
const { makeExecutableSchema } = require("apollo-server");
const { DateTimeResolver } = require("graphql-scalars");
var { LogoSchema } = require("../models/Logo");

const typeDefs = `

scalar DateTime
type Image {

  url:String
  alt:String
  width:Int
  height:Int
  zOrder:Int
  xPosition:Int
  yPosition:Int
  uid:String
}
type Text {
  uid:String
  text: String
  color: String
  fontSize:Int
  backgroundColor:String
  borderRadius:Int
  borderThickness :Int
  borderColor: String
  margin : Int
  padding : Int
  zOrder: Int
  xPosition: Int
  yPosition: Int
  
}

input ImageInput {
  url:String!
  width:Int!
  height:Int!
  alt:String
  uid:String!
  zOrder:Int
  xPosition:Int
  yPosition:Int


}

input TextInput {
  uid: String!
  text: String!
  color: String
  fontSize:Int
  backgroundColor:String
  borderRadius:Int
  borderThickness :Int
  borderColor: String
  margin : Int
  padding : Int
  zOrder: Int
  xPosition: Int
  yPosition: Int
  
}
  type Logo {
    _id: String
    owner:String
    images: [Image]
    texts:[Text]
    width: Int
    height: Int
    lastUpdate : DateTime
 }

 type myBoolean{
   result: Boolean!
 }

type Query {
    logos: [Logo]
    logo(id: String!): Logo
  }

type Mutation{

    addLogo(owner:String!,width:Int!,height:Int!, images:[ImageInput],texts:[TextInput]): Logo
    updateLogo(id:String!,owner:String!,width:Int!,height:Int!, images:[ImageInput],texts:[TextInput]): Logo
    removeLogo(id:String!):Logo
    clearLogos:myBoolean
}
`;

const resolvers = {
  // DateTime: DateTimeResolver,
  Query: {
    logos: () => LogoModel.find().sort({ lastUpdate: -1 }).exec(),

    logo: (_, { id }) => {
      console.log(id);
      return LogoModel.findById(id).exec();
    },
  },

  Mutation: {
    addLogo: (_, params) => {
      const logoModel = new LogoModel(params);

      const newLogo = logoModel.save();
      if (!newLogo) {
        throw new Error("Error");
      }
      console.log(newLogo)
      return newLogo;
    },
    updateLogo: (_, params) => {
      // const logoModel = new LogoModel(params);
      // console.log(logoModel)
      return LogoModel.findByIdAndUpdate(
        params.id,
        {
          texts: params.texts,
          owner:params.owner,
          images:params.images,
          width:params.width,
          height:params.height,
          lastUpdate: new Date(),
        },
        function (err) {
          if (err) return next(err);
        }
      );
    
    },

    removeLogo: (_, params)=>{
    
     
        const remLogo = LogoModel.findByIdAndRemove(params.id).exec();
        if (!remLogo) {
          throw new Error("Error");
        }
        return remLogo;
      
    },

    clearLogos: ()=>{

      const remLogos = LogoModel.deleteMany({}).exec()
      console.log(remLogos)
      let myBoolean ={result:false}
        if (!remLogos) {
        throw new Error("Error");      
      }

      console.log(remLogos)
      myBoolean.result = true

      
      return myBoolean;
    
      
// const remLogo = LogoModel.findByIdAndRemove(params.id).exec();
      // if (!remLogo) {
      //   throw new Error("Error");      
      // }
      // return remLogo;
    
  },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
