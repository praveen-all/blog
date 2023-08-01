import { Box, Text } from '@chakra-ui/react';
import React from 'react'
import MostTrendingCompo from './MostTrendingCompo';

function MostTrending({Blogs}) {
  return (
    <Box className="container"  >
      <Text marginBottom={"10px"} fontSize={"1.5rem"} textAlign={"center"}>
        daily blog

      </Text>
      <hr />

      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"20px"}
        flexWrap={"wrap"}
        
        width={"100%"}
        marginLeft={"auto"}
        
        
      >
      { Blogs?Blogs.map(el=>(<MostTrendingCompo blog={el}/>)):<></>}
      </Box>
    </Box>
  );
}

export default MostTrending