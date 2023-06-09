import React, {useState} from 'react';
import './Modal.css';
import Button from '../Button/Button';
import {Continent, Size} from '../../types/types';
import {postSearch} from '../../Map/api';

interface SearchBoxProps {
	onSearch: (data: any) => void;
	onContinuousChange: (value: boolean) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({onSearch, onContinuousChange}) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedSizes, setSelectedSizes] = useState<Size[]>([]);
	const [selectedContinents, setSelectedContinents] = useState<Continent[]>([]);
	const [isContinuous, setIsContinuous] = useState(false);

	const sizes: Size[] = ['small', 'medium', 'large'];
	const continents: Continent[] = ['africa', 'asia', 'europe', 'north-america', 'south-america', 'australia'];

	const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const size = event.target.value as Size;
		if (selectedSizes.includes(size)) {
			setSelectedSizes(selectedSizes.filter((s) => s !== size));
		} else {
			setSelectedSizes([...selectedSizes, size]);
		}
	};

	const handleContinentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const continent = event.target.value as Continent;
		if (selectedContinents.includes(continent)) {
			setSelectedContinents(selectedContinents.filter((c) => c !== continent));
		} else {
			setSelectedContinents([...selectedContinents, continent]);
		}
	};

	const handleContinuousChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsContinuous(event.target.checked);
		// Call the onContinuousChange function with the new value
		onContinuousChange(event.target.checked);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// Pass the isContinuous state value when calling postSearch
		const searchData = await postSearch(searchTerm, selectedSizes, selectedContinents);
		onSearch(searchData);
	};
	function capitalize(s) {
		return s[0].toUpperCase() + s.slice(1);
	}

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-6 w-100">
					<form onSubmit={handleSubmit}>
						<div className="input-group mb-3 w-75">
							<input type="text" className="form-control search-box" placeholder="Search..." aria-label="Search" aria-describedby="basic-addon2" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
							<button className="btn btn-primary" type="button" id="button-addon2">
								Choose from map
							</button>
						</div>
						<div className="row">
							<button type="submit" className="btn btn-primary mx-5">
								Search
							</button>
							<div className="col-md-6 mb-3">
								<label className="form-label">Size</label>
								<div className="dropdown">
									<button className="btn btn-secondary dropdown-toggle" type="button" id="sizeFilterDropdown" data-bs-toggle="dropdown" aria-expanded="false">
										{selectedSizes.length === 0 ? 'All sizes' : selectedSizes.join(', ')}
									</button>
									<ul className="dropdown-menu" aria-labelledby="sizeFilterDropdown">
										{sizes.map((size) => (
											<li key={size}>
												<label>
													<input type="checkbox" value={size} checked={selectedSizes.includes(size)} onChange={handleSizeChange} />
													{capitalize(size)}
												</label>
											</li>
										))}
									</ul>
								</div>
							</div>
							<div className="col-md-6 mb-3">
								<label className="form-label">Continent</label>
								<div className="dropdown">
									<button className="btn btn-secondary dropdown-toggle" type="button" id="continentFilterDropdown" data-bs-toggle="dropdown" aria-expanded="false">
										{selectedContinents.length === 0 ? 'All continents' : selectedContinents.join(', ')}
									</button>
									<ul className="dropdown-menu" aria-labelledby="continentFilterDropdown">
										{continents.map((continent) => (
											<li key={continent}>
												<input type="checkbox" value={continent} checked={selectedContinents.includes(continent)} onChange={handleContinentChange} />
												<label>{capitalize(continent)}</label>
											</li>
										))}
									</ul>
									<div className="row">
										<div className="col-md-12 mb-3">
											<label className="form-label">Continuous Flight</label>
											<input type="checkbox" value={isContinuous} checked={isContinuous} onChange={handleContinuousChange} />
										</div>
									</div>
									<button type="submit" className="btn btn-primary mx-5">
										Search
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
export default SearchBox;
