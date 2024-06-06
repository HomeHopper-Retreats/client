import { Flex, Image, Text, Heading, Box, Card, Divider, Link, useToken } from '@chakra-ui/react';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

const AboutUsPage = () => {
    const orange = useToken('colors', 'red.200');
    const gray = useToken('colors', 'gray.50');  

      const contentStyles = {
        border: `3px solid ${orange}`, // Border color matching the background
        borderRadius: '10px', // Rounded corners
        padding: '20px',
        
      };

      const bg = {
        background: `${orange}`
      }

    
  return (
    <Flex bg="gray.50" direction="column" align="center" justify="flex-start" h="100vh"  >
      
      <Card  style={contentStyles} mb={8} maxW="700px" boxShadow="md">
      <Heading as="h1" mb={4}>The HomeHopper Team</Heading>
      <Divider />
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
          <Heading as="h4" mb={0} size='md'>Christian Küchler</Heading>
          <Heading as="h6" mb={0} size='sm'>Co-Founder</Heading>
          <Flex pt={3}>
            <Link pr={2} href="https://www.linkedin.com/in/christian-k-2646983a/" isExternal>
          <FaLinkedin  fontSize="2rem" />
          </Link>
          <Link href="https://github.com/krilleyeah" isExternal>
          <FaGithub fontSize="2rem" />
          </Link>
          </Flex>
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
          <Heading as="h4" mb={0} size='md'>Michael Giannini</Heading>
          <Heading as="h6" mb={0} size='sm'>Co-Founder</Heading>
          <Flex pt={3}>
            <Link pr={2} href="https://www.linkedin.com/in/michael-giannini/" isExternal>
          <FaLinkedin fontSize="2rem" />
          </Link>
          <Link href="https://github.com/Cardioday" isExternal>
          <FaGithub fontSize="2rem" />
          </Link>
          </Flex>
          
        </Flex>

      </Flex>
      <Divider orientation='horizontal' mb={3} />
      
      <Text fontSize="lg" w="560px" textAlign="center">Founded by Christian Küchler and Michael Giannini, HomeHopper brings the joy back into your rental home search. From cozy cottages to vibrant urban lofts, we can help you find exactly what you're looking for. Now's the time to jump into your next happy place with HomeHopper!</Text>
      <Card p={1} mt={3}style={bg}>
        <Text fontWeight="semibold" w="560px" textAlign="center">HomeHopper was brought to life using MERN (MongoDB, Express, React, Node.js) technologies. Styling with Tailwind CSS and Chakra UI.
        </Text>
      </Card>
      </Card>
      
    </Flex>
  );
};

export default AboutUsPage;