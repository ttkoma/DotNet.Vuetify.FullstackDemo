using System;

namespace FullStackDemo.Api.Models
{
    public class CollectionResponse<TItem>
    {
        public CollectionResponse(TItem[] data, int totalCount)
        {
            this.Data = data;
            this.TotalCount = totalCount;
        }

        public TItem[] Data { get; set; }

        public int TotalCount { get; set; }
    }
}