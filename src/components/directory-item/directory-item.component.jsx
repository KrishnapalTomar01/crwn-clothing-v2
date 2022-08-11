import { useNavigate } from 'react-router-dom';
import { DirectoryItemContainer, BackgroundImage, Body } from './directory-item.styles'

const DirectoryItem = ({ category }) => {
    const { imageUrl, title, route } = category;
    const navigate = useNavigate();
    const clickDirectoryItemHandler = () => navigate(route)
    
    return (
        <DirectoryItemContainer onClick={clickDirectoryItemHandler}>
            <BackgroundImage imageUrl={imageUrl} />
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    );
}

export default DirectoryItem;