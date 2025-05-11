// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface AggregatedSwap {
    function getAllQuoteForTokenToToken(
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn,
        uint24 _fee,
        uint160 _sqrtPriceLimitX96
    )
        external
        returns (
            uint256 quoteFromUniSwapV2,
            uint256 quoteFromSushiSwapV2,
            uint256 quoteFromQuickSwapV2,
            uint256 quoteFromPancakeV2,
            uint256 quoteFromKyberSwapV2,
            uint256 quoteFromUniSwapV3,
            uint256 quoteFromSushiSwapV3,
            uint256 quoteFromQuickSwapV3,
            uint256 quoteFromPancakeSwapV3
        );
}
