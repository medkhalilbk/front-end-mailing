// Chakra imports
import { Button, Flex, useColorModeValue } from '@chakra-ui/react';
// Assets
import { useDropzone } from 'react-dropzone';
import { useEffect } from 'react';
function Dropzone(props: { content: JSX.Element | string; [x: string]: any | any }) {
	const { content, ...rest } = props;
	const { getRootProps, getInputProps , acceptedFiles } = useDropzone();
	const bg = useColorModeValue('gray.100', 'navy.700');
	const borderColor = useColorModeValue('secondaryGray.100', 'whiteAlpha.100');
	const files = acceptedFiles.map((file : any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
useEffect(() => {
	if (files.length > 0) {
	props.setFile(files)	
 }
}, [files])

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
			{...getRootProps({ className: 'dropzone' })}
			{...rest}>
			<input {...getInputProps()} />
			<Button variant='no-effects'>{content}</Button>
			  
		</Flex>
		 
	);
}

export default Dropzone;
