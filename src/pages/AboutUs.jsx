import { Flex, Image, Text, Heading, Box } from '@chakra-ui/react';

const AboutUsPage = () => {

    const containerStyles = {
        backgroundColor: '#FFB86F', // Dreamsicle orange color
        backgroundImage: 'linear-gradient(to bottom, #FFF, #FFB86F)', // White-to-orange gradient blend
        
      };

      const contentStyles = {
        border: '1px solid #FFB86F', // Border color matching the background
        borderRadius: '10px', // Rounded corners
        padding: '20px'
      };
  return (
    <Flex direction="column" align="center" justify="flex-start" h="100vh" p={8} style={containerStyles}>
      <Heading as="h1" mb={8}>Meet Our Team</Heading>
      <Box style={contentStyles} mb={8} maxW="600px">
      <Flex justify="center" align="flex-start" mb={4}>
        <Flex direction="column" align="center" m={4}>
          <Image
            src="https://media.licdn.com/dms/image/D4E03AQGJmaLtlbK_vA/profile-displayphoto-shrink_200_200/0/1687183868492?e=1723075200&v=beta&t=fgmygb3Z-NidyWZiM5QYX1VDhxxjQojRmaiwydfY0Ok"
            alt="Person 1"
            w="200px"
            h="200px"
            borderRadius="full"
            objectFit="cover"
            mb={4}
          />
        </Flex>
        <Flex direction="column" align="center" m={4}>
          <Image
            src="https://media.licdn.com/dms/image/C4D03AQEisB8JDffh_g/profile-displayphoto-shrink_200_200/0/1643383155386?e=1723075200&v=beta&t=HyVEW8eWLskJSm2KUSQlWfksT_x1ilby_tsAI9iwdbw"
            alt="Person 2"
            w="200px"
            h="200px"
            borderRadius="full"
            objectFit="cover"
            mb={4}
          />
        </Flex>
      </Flex>
      <Text fontSize="md" w="400px" textAlign="center">From cozy cottages nestled in lush landscapes to vibrant urban lofts pulsing with city life, our mission is to help you discover your ideal sanctuary. With a dash of whimsy and a sprinkle of magic, we can't wait to embark on this exciting journey with you, as we hop, skip, and jump toward finding your perfect place to call home.</Text>
      </Box>
    </Flex>
  );
};

export default AboutUsPage;