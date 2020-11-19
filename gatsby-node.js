const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const {graphql} = require("gatsby")
const path = require("path")

exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions
  return graphql(`
  {
  wpcontent {
    artists {
      edges {
        node {
          slug
          id
        }
      }
    }
  }
}
  `).then(result => {
    if(result.errors){ //hier zeggen we als onze promise resulaat die we krijgen van onze querry een error is dan
      result.errors.forEach(e => console.error(e.toString()))
        //zullen we voor elke error een console error maken en die error om vormen naar een string
        return Promise.reject(result.errors); 
    }
    const artists = result.data.wpcontent.artists.edges;
    artists.forEach( artist => {
      const {id, slug } = artist.node; //dit is destructioneren 
      //const id = artist.node.id;
      //const slug = artist.node.slug; net hetzelfde gewoon korter
      createPage({
        path: slug, //naar welke route zal verwijzen
        component: path.resolve(`src/templates/artist.js`), //hier geven we mee welke component of templete we hier me geven 
        //zal de root directory nemen van onze bestand en koppelen aan templates om die components te krijg dus 
        context: { //zegt welke data zal je mee geven aan onze component
          id,
          slug,

        }
      })
    })
  })
}
/* Aan de hand van dit stukje code worden de images vanuit WPgraphql omgezet tot images waarop Gatsby image optimization kan toepassen */
exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions

  await createResolvers({
    WPGraphql_MediaItem: {
      imageFile: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.sourceUrl

          if (source.mediaItemUrl !== undefined) {
            sourceUrl = source.mediaItemUrl
          }

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}
