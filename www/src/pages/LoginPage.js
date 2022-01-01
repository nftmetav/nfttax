import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';

function InputWalletAddressDialogRaw(props) {
  const { onClose, open, ...other } = props;
  const [input, setInput] = useState('');

  const handleCancel = () => {
    onClose();
  };

  const handleConfirm = () => {
    onClose(input);
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '25%', maxHeight: 435 } }}
      maxWidth="xl"
      open={open}
      {...other} /* eslint react/jsx-props-no-spreading: 0 */
    >
      <DialogTitle>Input your wallet address</DialogTitle>
      <DialogContent dividers>
        <OutlinedInput
          onChange={handleChange}
          inputProps={{ pattern: '[0-9a-zA-Z]*' }}
          sx={{ width: '100%', fontFamily: 'Courier' }}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}

// InputWalletAddressDialogRaw.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
// };

export default function LoginPage() {
  const [dialogIsOpen, setDialogIsOpen] = React.useState(false);

  const handleOpenDialog = () => {
    setDialogIsOpen(true);
  };

  const loginWithMetaMask = () => {
    console.log('Logging in with MetaMask ...');
  };

  const loginWithCoinbaseWallet = () => {
    console.log('Logging in with Coinbase Wallet ...');
  };

  const handleCloseDialog = (address) => {
    setDialogIsOpen(false);

    if (address) {
      console.log(`Wallet address from manual input: ${address}`);
      window.localStorage.setItem('walletAddress', address);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 360,
        margin: '0 auto',
        bgcolor: 'background.paper',
        border: 1,
        borderColor: '#000000',
        borderRadius: 2,
      }}
    >
      <List component="div" role="group" sx={{ padding: 0 }}>
        <ListItem button divider onClick={loginWithMetaMask}>
          <Icon sx={{ marginRight: '10px' }}>
            <img src="https://docs.metamask.io/metamask-fox.svg" height="24" width="24" alt="MetaMask Logo" />
          </Icon>
          <ListItemText primary="MetaMask" />
        </ListItem>
        <ListItem button divider onClick={loginWithCoinbaseWallet}>
          <Icon sx={{ marginRight: '10px' }}>
            <img
              src="https://static.wikia.nocookie.net/logopedia/images/9/9a/Coinbase_2021_App.png"
              height="24"
              width="24"
              alt="Coinbase Logo"
            />
          </Icon>
          <ListItemText primary="Coinbase Wallet" />
        </ListItem>
        <ListItem
          button
          onClick={handleOpenDialog}
        >
          <Icon sx={{ marginRight: '10px' }}>
            <img
              src="https://www.oiml.org/en/ressources/icons/link-icon.png"
              height="24"
              width="24"
              alt="Coinbase Logo"
            />
          </Icon>
          <ListItemText primary="Wallet Address" />
        </ListItem>
        <InputWalletAddressDialogRaw
          id="input-wallet-address"
          keepMounted
          open={dialogIsOpen}
          onClose={handleCloseDialog}
        />
      </List>
    </Box>
  );
}
