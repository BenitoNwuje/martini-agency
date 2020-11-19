import React from 'react'
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"

import {Wrapper, Image, BottomEdgeDown, BottomEdgeUp, Artist} from "../pageStyles/pageStyles"
import {COLORS} from "../constants"
//is een functionele component 
const ArtistsPage = () => {
    // hier zullen we onze query destructioneren
   const {wpcontent: {
    page: {
    artistsMeta:{ artistsPageDescription, artistsPageHeaderPicture },},
    artists: {edges: artists}
}} = useStaticQuery(graphql`
   query {
  wpcontent {
    page(id: "artists", idType: URI) {
      artistsMeta {
        artistsPageDescription
        artistsPageHeaderPicture {
            sourceUrl 
			imageFile {
            childImageSharp {
                fluid(quality: 100) {
                                ...GatsbyImageSharpFluid_withWebp
                                }
                            } 
                        }
          altText
        }
      }
    }
    artists {
      edges {
        node {
          artist {
            firstName
            lastName
            artistName
            profile {
                altText
                sourceUrl 
			imageFile {
            childImageSharp {
                fluid(quality: 50) {
                                ...GatsbyImageSharpFluid_withWebp
                                }
                            } 
                        }

            }
            
          }
          slug
        }
      }
    }
  }
}

   `)


    // layout zal onze pagina een footer and header geven
    return <Layout>
        <SEO title="Artists" />
        <Wrapper artistsColor={COLORS.BLACK}  descriptionColor={COLORS.SECONDARY} > 
            <div className="banner">
                <Image fluid={artistsPageHeaderPicture.imageFile.childImageSharp.fluid}
                alt={artistsPageHeaderPicture.altText} />
                <BottomEdgeDown color={COLORS.SECONDARY} />
            </div>
            <div className="description">
                <h2>We are Martini Agency</h2>
                <p>{artistsPageDescription}</p>
                <BottomEdgeUp color={COLORS.BLACK} />
            </div>
            <div className="artists">
                <h2>Our Artists</h2>
                <div className="artist-items">
                    {artists.map(({node: {artist, slug}}) => (
                        <Artist to={`/${slug}`} key={slug}>
                            <Image fluid={artist.profile.imageFile.childImageSharp.fluid}
                            alt={artist.profile.altText} />
                            <div className="artist-info">
                                <p>
                                    {artist.firstName} {artist.lastName} 
                                </p>
                                {artist.artistName && <p> {artist.artistName}</p>}
                                {/* if artist name bestaat  */}
                            </div>
                        </Artist>
                    ))}
                </div>
            </div>
        </Wrapper>


    </Layout>     
        
    
}

export default ArtistsPage