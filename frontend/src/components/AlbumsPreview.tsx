import React from "react";
import { Button, ImageList, ImageListItem } from "@material-ui/core"

const AlbumsPreview = ({albums}: {albums: SpotifyApi.ArtistsAlbumsResponse}) => {
	return ( <ImageList cols={4} rowHeight='auto' gap={16}>
	{albums &&
	  albums.slice(0, 4).map((item) => (
	    <ImageListItem key={item.album.id} className={classes.listItem}>
	      <Button
		onClick={() => history.push(`/albums/${item.album.id}`)}
	      >
		<img
		  className={classes.albumWidth}
		  src={item.album.images[2].url}
		  alt='album-cover'
		/>
	      </Button>
	    </ImageListItem>
	  ))} );
        </ImageList>
}
 
export default AlbumsPreview;