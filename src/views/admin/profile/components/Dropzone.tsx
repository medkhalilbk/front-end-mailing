import { Box, Button, Flex, Icon, useColorModeValue,Text } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';
import { MdUpload } from 'react-icons/md';

function Dropzone(props: any) {
	

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { content, ...rest } = props;

	useEffect(() => {
    console.log(selectedFile)
    props.filname(selectedFile)
  },[selectedFile])

  const {
    getRootProps,
    getInputProps,
    acceptedFiles, 
  } = useDropzone({
    accept: "text/csv",
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
    },
  });

  const bg = useColorModeValue('gray.100', 'navy.700');
  const borderColor = useColorModeValue('secondaryGray.100', 'whiteAlpha.100');

  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const uploadFile = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('mailFile', selectedFile);
	  formData.append("name", selectedFile.name)
      console.log("Selected file:", selectedFile); 
    }
  };

  return (
    <Flex 
      align='center'
      justify='center'
      bg={bg}
      border='1px dashed'
      borderColor={borderColor}
      borderRadius='16px'
      w='100%'
      h='max-content'
      minH='100%'
      cursor='pointer'
      {...getRootProps({ className: 'dropzone'})}
      {...rest}>
      <input {...getInputProps()} />
      <Button onClick={uploadFile} variant='no-effects'> <Box>
							<Icon as={MdUpload} w='80px' h='80px' color={props.brandColor} />
							<Flex justify='center' mx='auto' mb='12px'>
								<Text fontSize='xl' fontWeight='700' color={props.brandColor}>
									Upload Files
								</Text>
							</Flex>
							<Text fontSize='sm' fontWeight='500' color='secondaryGray.500'>
								{selectedFile?.name ? selectedFile?.name  : "Only .csv files are allowed!"}
							</Text>
		  </Box> </Button>
		 
    </Flex>
  );
}

export default Dropzone;
