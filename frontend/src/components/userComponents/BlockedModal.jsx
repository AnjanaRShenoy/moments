import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
function BlockedModal() {
  return (
    <>
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
        width="600px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
        Your account has been blocked. You have no longer access to this account. 
        </AlertTitle>
        {/* <AlertDescription maxWidth="sm">
          Thanks for submitting your application. Our team will get back to you
          soon.
        </AlertDescription> */}
      </Alert>
    </>
  );
}
export default BlockedModal;
