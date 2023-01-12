import QuartersModel from '../models/quarters.js';

// Show items to autorized users
export const authorized = async (req, res) => {
  try {
    const quarters = await QuartersModel.find();

    res.json(quarters);
  } catch (e) {
    console.log(`Fetching quarters data failed: ${e}`);
    res.status(500).json('Quarters loading failed.\nPlease try again later.');
  }
};

// Show items to unautorized users
export const fetch = async (req, res) => {
  try {
    const quarters = await QuartersModel.find();

    res.json(quarters);
  } catch (e) {
    console.log(`Fetching quarters data failed: ${e}`);
    res.status(500).json({ message: 'Error. Please try again later.' });
  }
};

// Show item info
export const getInfo = async (req, res) => {
  try {
    const cardId = req.params.id;
    const card = await QuartersModel.findOne({ _id: cardId });

    if (!card) {
      console.log('User is trying to get data that is not available');
      return res.json({
        message: 'Qarters not found or being deleted.',
      });
    }

    res.json(card);
  } catch (e) {
    console.log(`Quarters card fetching failed: ${e}`);
    res.status(500).json({
      message: 'Error. Please try again later.',
    });
  }
};
