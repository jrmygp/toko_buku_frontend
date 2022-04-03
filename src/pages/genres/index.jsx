import { useState, useEffect } from "react";
import { axiosInstance } from "../../config/api";
import { Box, Center, Flex, Input, Text, Button } from "@chakra-ui/react";

const Genres = () => {
  const [contentList, setContentList] = useState([]);
  const [newGenre, setNewGenre] = useState("");
  const handleGenre = () => {
    const { value } = event.target;
    setNewGenre(value);
  };
  const fetchGenres = async () => {
    try {
      const response = await axiosInstance.get("/genres");
      setContentList(response.data.result.rows);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteGenre = async (id) => {
    try {
      const response = await axiosInstance.delete(`/genres/${id}`);
    //   setContentList(response.data.result.rows);
    fetchGenres()
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const addGenre = async () => {
    const newData = {
      genre_name: newGenre,
    };
    try {
      const response = await axiosInstance.post("genres", newData);
      //   setContentList(response.data.result.rows);
      fetchGenres();
    } catch (err) {
      console.log(err);
    }
  };

  const renderContentList = () => {
    return contentList?.map((val) => {
      return (
        <Box mb={2} mt={1} borderBottom="1px solid black">
          <Flex
            justifyContent="space-between"
            mb={2}
            paddingLeft={7}
            paddingRight={7}
          >
            <Text fontSize="lg">{val.id}</Text>
            <Text fontSize="2xl">{val.genre_name}</Text>
            <Button colorScheme="red" onClick={() => deleteGenre(val.id)}>
              Delete
            </Button>
          </Flex>
        </Box>
      );
    });
  };
  useEffect(() => {
    fetchGenres();
  }, []);
  return (
    <Box pl={5} pr={5}>
      <Box borderBottom="3px solid black">
        <Text ml={5} mt={5} fontWeight="bold" fontSize="5xl">
          Tags
        </Text>
        <Flex mb={3} mt={5} ml={6} mr={6} justifyContent="space-between">
          <Text fontWeight="bold" fontSize="2xl">
            ID
          </Text>
          <Text fontWeight="bold" fontSize="2xl">
            Tag name
          </Text>
          <Text fontWeight="bold" fontSize="2xl">
            Action
          </Text>
        </Flex>
      </Box>
      {renderContentList()}
      <Flex
        borderTop="3px solid black"
        borderBottom="2px solid grey"
        mt={5}
        alignItems="center"
      >
        <Box mb={3} ml={5}>
          <Text fontSize="xl" fontWeight="bold">
            Genre Name
          </Text>
          <Input maxW="500px" onChange={handleGenre}></Input>
        </Box>
        <Button colorScheme="green" ml={3} mt={5} onClick={addGenre}>
          Add New Genre
        </Button>
      </Flex>
    </Box>
  );
};

export default Genres;
