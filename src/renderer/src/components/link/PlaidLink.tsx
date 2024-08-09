// APP COMPONENT
// Upon rendering of App component, make a request to create and
// obtain a link token to be used in the Link component
import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import GeneralButton from '../general/GeneralButton';
const PlaidLink = () => {
  const [linkToken, setLinkToken] = useState(null);
  const generateToken = async () => {
    const response = await window.context.createLinkToken();
    console.log('response', response);
    const data = await response;
    setLinkToken(data.link_token);
  };
  useEffect(() => {
    generateToken();
  }, []);
  return linkToken != null ? <Link linkToken={linkToken} /> : <></>;
};
// LINK COMPONENT
// Use Plaid Link and pass link token and onSuccess function
// in configuration to initialize Plaid Link
interface LinkProps {
  linkToken: string | null;
}
const Link: React.FC<LinkProps> = (props: LinkProps) => {
  const onSuccess = React.useCallback((public_token, metadata) => {
    // send public_token to server
    const response = window.context.setAccessToken(public_token);
    // Handle response ...
    console.log(response);
  }, []);
  const config: Parameters<typeof usePlaidLink>[0] = {
    token: props.linkToken!,
    onSuccess,
  };
  const { open, ready } = usePlaidLink(config);
  return (
    <GeneralButton onClick={() => open()} disabled={!ready}>
      Link Accounts
    </GeneralButton>
  );
};
export default PlaidLink;
