import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/Seo';
import {Wrapper, Image} from './templateStyles/artistStyles';


const ArtistTemplate = ({
    data: {
        wpcontent:{
            artist:{
                artist, 
                roles: { edges: roles},
        },
    },
},
}) => {
    const {picture1, picture2, picture3} = artist.pictures
    const pictures = [picture1, picture2, picture3];
    console.log(pictures);

    return (
        <Layout>
            <SEO title="Artist" />
            <Wrapper>
                <div className="artist-container">
                    <div className="artist-image">
                    <Image fluid={artist.profile.imageFile.childImageSharp.fluid} alt={artist.profile.altText}/>
                    <div className="roles">
                        {/*  bij map geven node: een nieuwe naam genaamd role en halen wij de data uit van node dus*/}
                        {/* node.name = role.name and node:role = role = node */}
                        {roles.map(({node: role, i}) => (
                            <div key={i} className="role"> {role.name}


                            </div>

                        ))}
                    </div>

                    </div>
                   <div className="artist-info">
                        <h2>{artist.firstName} {artist.lastName}</h2>
                        {artist.artistName ? (
                            <h3><span>{artist.artistName} -</span> <span>{artist.locale}</span></h3>
                        ) : (
                        <h3>{artist.locale}</h3>
                        )}
                        <p className="description">{artist.description}</p>
                        <p className="info">
                            <strong>Email:</strong> {artist.email}
                        </p>
                        <p className="info">
                            <strong>Phone:</strong> {artist.phone}
                        </p>
                        <p className="info">
                            <strong>Height:</strong> {artist.height}
                        </p>
                        <p className="info">
                            <strong>Shoe size:</strong> {artist.shoeSize}
                        </p>

                   </div>
                </div>
                <div className="artist-pictures">
                   {pictures.map(picture => (
                       <div key={pictures} className="artist-pictures"> 
                        <Image  fluid={picture.imageFile.childImageSharp.fluid} alt={picture.altText} />
                       
                       </div>
                   ))}
                </div>
            </Wrapper>
        </Layout>
    )
}

export default ArtistTemplate

export const pageQuery = graphql`
query ($id: ID!) {
    wpcontent {
  artist(id: $id, idType: ID) {
    roles {
      edges {
        node {
          name
        }
      }
    }
    artist {
      artistName
      description
      email
      fieldGroupName
      firstName
      height
      lastName
      locale
      phone
      pictures {
        picture1 {
            sourceUrl 
			                imageFile {
                                childImageSharp {
                                    fluid(quality: 75) {
                                        ...GatsbyImageSharpFluid_withWebp
                                    }
                                } 
                            }
          altText
        }
        picture2 {
            sourceUrl 
			                imageFile {
                                childImageSharp {
                                    fluid(quality: 75) {
                                        ...GatsbyImageSharpFluid_withWebp
                                    }
                                } 
                            }
          altText
        }
        picture3 {
            sourceUrl 
			                imageFile {
                                childImageSharp {
                                    fluid(quality: 75) {
                                        ...GatsbyImageSharpFluid_withWebp
                                    }
                                } 
                            }
          altText
        }
      }
      profile {
        sourceUrl 
			                imageFile {
                                childImageSharp {
                                    fluid(quality: 75) {
                                        ...GatsbyImageSharpFluid_withWebp
                                    }
                                } 
                            }
        altText
      }
      shoeSize
    }
    id
  }
}
}

`