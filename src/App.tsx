import { useState } from 'react';
import styles from './App.module.css';

function App() {
	const [balance, setBalance] = useState<number>(0);
	const [addedMoney, setAddedMoney] = useState<number>(0);
	const [removedMoney, setRemovedMoney] = useState<number>(0);
	const [addedMoneyError, setAddedMoneyError] = useState<string>('');
	const [removedMoneyError, setRemovedMoneyError] = useState<string>('');
	const [balanceError, setBalanceError] = useState<string>('');
	const [showDenominations, setShowDenominations] = useState<boolean>(false);
	const [lastRemovedMoney, setLastRemovedMoney] = useState<number>(0);
	const [lastBalanceState, setLastBalanceState] = useState<number>(0);
	const [denominationsMessage, setDenominationsMessage] = useState<string[]>(
		[]
	);
	const [transactionHistory, setTransactionHistory] = useState<string[]>([]);

	const handleAddInitialBalance =
		(/* event: React.MouseEvent<HTMLElement> */) => {
			setBalance(addedMoney);
			setAddedMoney(0);
		};

	const handleTransactionHistory = (amount: number, action: string) => {
		const newDate = new Date();
		if (amount === 0) {
			return;
		}
		if (action === 'add') {
			setTransactionHistory([
				...transactionHistory,
				`Added €${amount} to account. (${newDate})`,
			]);
		} else
			setTransactionHistory([
				...transactionHistory,
				`Removed €${amount} from account. (${newDate})`,
			]);
	};

	const handleAddToBalance = (
		event: React.FormEvent<HTMLFormElement>
	): void => {
		event.preventDefault();
		if (addedMoney % 10 !== 0) {
			setAddedMoneyError(
				'All deposits must be in amounts that are divisible by at least 10, with banknotes in denominations of 10, 20, 50, 100, 200 and 500 euros.'
			);
			return;
		} else setAddedMoneyError('');
		const newBalance = balance + addedMoney;
		setBalance(newBalance);
		handleTransactionHistory(addedMoney, 'add');
		setAddedMoney(0);
		setShowDenominations(false);
		setDenominationsMessage([]);
	};

	const handleAddFunds = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setAddedMoney(Number(event.currentTarget.value));
	};

	const handleRemoveFromBalance = (
		event: React.FormEvent<HTMLFormElement>
	): void => {
		event.preventDefault();
		if (removedMoney > 5000) {
			setRemovedMoneyError('Maximum available withdrawal amount: €5000.');
			setShowDenominations(false);
			setDenominationsMessage([]);
			return;
		}
		if (removedMoney % 10 !== 0) {
			setRemovedMoneyError(
				'All withdrawals must be in amounts that are divisible by at least 10, with banknotes in denominations of 10, 20, 50, 100, 200 and 500 euros.'
			);
			setShowDenominations(false);
			setDenominationsMessage([]);
			return;
		} else setRemovedMoneyError('');

		const newBalance = balance - removedMoney;
		if (newBalance < 0) {
			setBalanceError(
				'You are attempting to withdraw more money than you have in your account. Please check the withdrawal amount.'
			);
			setRemovedMoney(0);
			setShowDenominations(false);
			return;
		}

		let bill500 = 0;
		let bill200 = 0;
		let bill100 = 0;
		let bill50 = 0;
		let bill20 = 0;
		let bill10 = 0;
		let moneyToWorkWith = removedMoney;

		bill500 = Math.floor(moneyToWorkWith / 500);
		console.log(bill500);
		moneyToWorkWith = moneyToWorkWith - bill500 * 500;
		bill200 = Math.floor(moneyToWorkWith / 200);
		console.log(bill200);
		moneyToWorkWith = moneyToWorkWith - bill200 * 200;
		bill100 = Math.floor(moneyToWorkWith / 100);
		console.log(bill100);
		moneyToWorkWith = moneyToWorkWith - bill100 * 100;
		bill50 = Math.floor(moneyToWorkWith / 50);
		console.log(bill50);
		moneyToWorkWith = moneyToWorkWith - bill50 * 50;
		bill20 = Math.floor(moneyToWorkWith / 20);
		console.log(bill20);
		moneyToWorkWith = moneyToWorkWith - bill20 * 20;
		bill10 = Math.floor(moneyToWorkWith / 10);
		console.log(bill10);
		moneyToWorkWith = moneyToWorkWith - bill10 * 10;

		const denominations = [];
		if (bill500 > 0) denominations.push(`€500 bills received: ${bill500} `);
		if (bill200 > 0) denominations.push(`€200 bills received: ${bill200} `);
		if (bill100 > 0) denominations.push(`€100 bills received: ${bill100} `);
		if (bill50 > 0) denominations.push(`€50 bills received: ${bill50} `);
		if (bill20 > 0) denominations.push(`€20 bills received: ${bill20} `);
		if (bill10 > 0) denominations.push(`€10 bills received: ${bill10} `);

		setDenominationsMessage(denominations);
		setShowDenominations(true);
		setLastBalanceState(balance);
		setLastRemovedMoney(removedMoney);
		setBalance(newBalance);
		handleTransactionHistory(removedMoney, 'remove');
		setRemovedMoney(0);
		setBalanceError('');
	};

	const handleRemoveFunds = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		setRemovedMoney(Number(event.currentTarget.value));
	};

	const handleRemoveBalanceError = () /* event: React.MouseEvent<HTMLElement> */
	: void => {
		setBalanceError('');
	};

	const handleRemoveRemovedMoneyError =
		() /* event: React.MouseEvent<HTMLElement> */ : void => {
			setRemovedMoneyError('');
		};

	const handleRemoveAddeddMoneyError =
		() /* event: React.MouseEvent<HTMLElement> */ : void => {
			setAddedMoneyError('');
		};

	return (
		<>
			<div className={styles.atm}>
				<div className={styles.atmContainer}>
					<h1>ATM</h1>
					{balance === 0 && (
						<>
							<input
								onChange={handleAddFunds}
								type='number'
								value={addedMoney || ''}
							/>
							<button
								style={{ margin: '5px' }}
								onClick={handleAddInitialBalance}
							>
								Set balance
							</button>
						</>
					)}
					{balance > 0 && (
						<div className={styles.atmContainer2}>
							<div className={styles.balance}>Balance: €{balance}</div>
							<div>
								<div className={styles.inputForm}>
									<h3>Add funds: </h3>
									<form onSubmit={handleAddToBalance}>
										<input
											onChange={handleAddFunds}
											type='number'
											value={addedMoney || ''}
										/>
										<button>Add</button>
									</form>{' '}
								</div>
							</div>
							<div className={styles.inputForm}>
								<h3>Withdraw funds:</h3>
								<form onSubmit={handleRemoveFromBalance}>
									<input
										onChange={handleRemoveFunds}
										type='number'
										value={removedMoney || ''}
									/>
									<button>Remove</button>
								</form>
							</div>
							<div className={styles.errorMessage}>
								{addedMoneyError && <p>{addedMoneyError}</p>}
								{addedMoneyError && (
									<button onClick={handleRemoveAddeddMoneyError}>
										Acknowledged.
									</button>
								)}
								{removedMoneyError && <p>{removedMoneyError}</p>}
								{removedMoneyError && (
									<button onClick={handleRemoveRemovedMoneyError}>
										Acknowledged.
									</button>
								)}
							</div>
							<div>
								{showDenominations && (
									<>
										<div>
											By removing {lastRemovedMoney} from {lastBalanceState} you
											have received the following denominations:{' '}
											{denominationsMessage.map((denom, index) => (
												<p key={index}>{denom}</p>
											))}
										</div>
										<p>New balance: €{balance}.</p>
									</>
								)}
							</div>
							{balanceError && <div>{balanceError}</div>}
							{balanceError && (
								<button onClick={handleRemoveBalanceError}>
									Acknowledged.
								</button>
							)}
						</div>
					)}
				</div>
				<div className={styles.transactionHistory}>
					{transactionHistory.length > 0 && (
						<>
							<h3>Transactions history</h3>

							<div>
								{transactionHistory.map((transaction) => (
									<li>{transaction}</li>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default App;
